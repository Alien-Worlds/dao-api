#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */

process.title = 'eosdac-api';

import * as fastifyCORS from 'fastify-cors';
import * as fastifyOAS from 'fastify-oas';

import fastify, { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';

import { CandidatesController } from './endpoints/candidates/domain/candidates.controller';
import { CandidatesVotersHistoryController } from './endpoints/candidates-voters-history/domain/candidates-voters-history.controller';
import { config } from './config';
import { Container } from '@alien-worlds/api-core';
import { CustodiansController } from './endpoints/custodians/domain/custodians.controller';
import { FastifyRoute } from './fastify.route';
import { GetCandidatesRoute } from './endpoints/candidates/routes/get-candidates.route';
import { GetCandidatesVotersHistoryRoute } from './endpoints/candidates-voters-history/routes/candidates-voters-history.route';
import { GetCustodiansRoute } from './endpoints/custodians/routes/get-custodians.route';
import { GetDacsController } from './endpoints/get-dacs/domain/get-dacs.controller';
import { GetDacsRoute } from './endpoints/get-dacs/routes/dacs.route';
import { GetProfileRoute } from './endpoints/profile/routes/get-profile.route';
import { GetVotingHistoryRoute } from './endpoints/voting-history/routes/voting-history.route';
import { initLogger } from './connections/logger';
import openApiOptions from './open-api'
import { ProfileController } from './endpoints/profile/domain/profile.controller';
import { setupEndpointDependencies } from './endpoints/api.ioc.config';
import { VotingHistoryController } from './endpoints/voting-history/domain/voting-history.controller';

initLogger('eosdac-api', config.logger);

export const buildAPIServer = async () => {
	const api: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify(
		{
			ignoreTrailingSlash: true,
			trustProxy: true,
			logger: true,
		}
	);

	api.register(fastifyOAS, openApiOptions);

	// Set IOC
	const apiIoc = await setupEndpointDependencies(new Container(), config);

	// controllers
	const profileController: ProfileController = apiIoc.get<ProfileController>(
		ProfileController.Token
	);

	const getDacsController: GetDacsController = apiIoc.get<GetDacsController>(
		GetDacsController.Token
	);

	const votingHistoryController: VotingHistoryController =
		apiIoc.get<VotingHistoryController>(VotingHistoryController.Token);

	const candidatesVotersHistoryController: CandidatesVotersHistoryController =
		apiIoc.get<CandidatesVotersHistoryController>(CandidatesVotersHistoryController.Token);

	const candidatesController: CandidatesController =
		apiIoc.get<CandidatesController>(CandidatesController.Token);

	const custodiansController: CustodiansController =
		apiIoc.get<CustodiansController>(CustodiansController.Token);

	// Mount routes

	FastifyRoute.mount(
		api,
		GetProfileRoute.create(profileController.profile.bind(profileController))
	);

	FastifyRoute.mount(
		api,
		GetDacsRoute.create(getDacsController.dacs.bind(getDacsController))
	);

	FastifyRoute.mount(
		api,
		GetVotingHistoryRoute.create(
			votingHistoryController.votingHistory.bind(votingHistoryController)
		)
	);

	FastifyRoute.mount(
		api,
		GetCandidatesVotersHistoryRoute.create(
			candidatesVotersHistoryController.candidatesVotersHistory.bind(candidatesVotersHistoryController)
		)
	);

	FastifyRoute.mount(
		api,
		GetCandidatesRoute.create(
			candidatesController.list.bind(candidatesController)
		)
	);

	FastifyRoute.mount(
		api,
		GetCustodiansRoute.create(
			custodiansController.list.bind(custodiansController)
		)
	);

	api.register(fastifyCORS, {
		allowedHeaders: 'Content-Type,X-DAC-Name',
		origin: '*',
	});

	api.ready().then(
		async () => {
			console.log(
				`Started API server with config ${config.environment} on ${config.host || '127.0.0.1'
				}:${config.port}`
			);
			await api.oas();
		},
		err => {
			console.error('Error starting API', err);
		}
	);

	return api;
};
