import {
  AlienWorldsContract,
  DaoWorldsContract,
  IndexWorldsContract,
  setupDacDirectoryRepository,
  setupFlagRepository,
  setupHistoryToolsBlockState,
  setupUserVotingHistoryRepository,
  TokenWorldsContract,
} from '@alien-worlds/dao-api-common';
import {
  AsyncContainerModule,
  Container,
  EosJsRpcSource,
  MongoSource,
} from '@alien-worlds/api-core';

import AppConfig from 'src/config/app-config';
import { CandidatesController } from './candidates/domain/candidates.controller';
import { CandidatesVotersHistoryController } from './candidates-voters-history/domain/candidates-voters-history.controller';
import { CountVotersHistoryUseCase } from './candidates-voters-history/domain/use-cases/count-voters-history.use-case';
import { CustodiansController } from './custodians/domain/custodians.controller';
import { GetAllDacsUseCase } from './get-dacs/domain/use-cases/get-all-dacs.use-case';
import { GetCandidatesUseCase } from './candidates/domain/use-cases/get-candidates.use-case';
import { GetCandidatesVotersHistoryUseCase } from './candidates-voters-history/domain/use-cases/get-candidates-voters-history.use-case';
import { GetCustodiansUseCase } from './custodians/domain/use-cases/get-custodians.use-case';
import { GetDacInfoUseCase } from './get-dacs/domain/use-cases/get-dac-info.use-case';
import { GetDacsController } from './get-dacs/domain/get-dacs.controller';
import { GetDacTokensUseCase } from './get-dacs/domain/use-cases/get-dac-tokens.use-case';
import { GetDacTreasuryUseCase } from './get-dacs/domain/use-cases/get-dac-treasury.use-case';
import { GetMembersAgreedTermsUseCase } from './candidates/domain/use-cases/get-members-agreed-terms.use-case';
import { GetMemberTermsUseCase } from './candidates/domain/use-cases/get-member-terms.use-case';
import { GetProfilesUseCase } from './profile/domain/use-cases/get-profiles.use-case';
import { GetUserVotingHistoryUseCase } from './voting-history/domain/use-cases/get-user-voting-history.use-case';
import { GetVotedCandidateIdsUseCase } from './candidates/domain/use-cases/get-voted-candidate-ids.use-case';
import { GetVotingPowerUseCase } from './candidates-voters-history/domain/use-cases/get-voting-power.use-case';
import { HealthController } from './health/domain/health.controller';
import { HealthUseCase } from './health/domain/use-cases/health.use-case';
import { IsProfileFlaggedUseCase } from './profile/domain/use-cases/is-profile-flagged.use-case';
import { ListCandidateProfilesUseCase } from './candidates/domain/use-cases/list-candidate-profiles.use-case';
import { ListCustodianProfilesUseCase } from './custodians/domain/use-cases/list-custodian-profiles.use-case';
import { ProfileController } from './profile/domain/profile.controller';
import { setupStateRepository } from './health';
import { setupVotingWeightRepository } from './candidates-voters-history/ioc.config';
import { VotingHistoryController } from './voting-history/domain/voting-history.controller';
import { setupDaoWorldsActionRepository } from '@alien-worlds/dao-api-common/build/contracts/dao-worlds/actions/ioc';

/*imports*/

export const setupEndpointDependencies = async (
  container: Container,
  config: AppConfig
): Promise<Container> => {
  const bindings = new AsyncContainerModule(async bind => {
    // async operations first and then binding

    /**
     * MONGO
     */
    const mongoSource = await MongoSource.create(config.mongo);

    const eosJsRpcSource = new EosJsRpcSource(config.eos.endpoint);

    /**
     * SMART CONTRACT SERVICES
     */

    await IndexWorldsContract.Services.Ioc.setupIndexWorldsContractService(
      eosJsRpcSource,
      container
    );
    await AlienWorldsContract.Services.Ioc.setupAlienWorldsContractService(
      eosJsRpcSource,
      container
    );
    await DaoWorldsContract.Services.Ioc.setupDaoWorldsContractService(
      eosJsRpcSource,
      container
    );
    await TokenWorldsContract.Services.Ioc.setupTokenWorldsContractService(
      eosJsRpcSource,
      container
    );

    /**
     * REPOSITORIES
     */

    await setupDaoWorldsActionRepository(mongoSource, container);
    await setupFlagRepository(mongoSource, container);
    await setupDacDirectoryRepository(mongoSource, eosJsRpcSource, container);
    await setupUserVotingHistoryRepository(mongoSource, container);
    await setupVotingWeightRepository(mongoSource, container);
    await setupStateRepository(mongoSource, container);

    /*bindings*/

    /**
     * HEALTH
     */

    await setupHistoryToolsBlockState(mongoSource, container);

    bind<HealthController>(HealthController.Token).to(HealthController);
    bind<HealthUseCase>(HealthUseCase.Token).to(HealthUseCase);

    /**
     * ACTIONS
     */

    bind<ProfileController>(ProfileController.Token).to(ProfileController);
    bind<GetProfilesUseCase>(GetProfilesUseCase.Token).to(GetProfilesUseCase);
    bind<IsProfileFlaggedUseCase>(IsProfileFlaggedUseCase.Token).to(
      IsProfileFlaggedUseCase
    );

    /**
     * DACS
     */

    bind<GetDacsController>(GetDacsController.Token).to(GetDacsController);
    bind<GetAllDacsUseCase>(GetAllDacsUseCase.Token).to(GetAllDacsUseCase);
    bind<GetDacTreasuryUseCase>(GetDacTreasuryUseCase.Token).to(
      GetDacTreasuryUseCase
    );
    bind<GetDacInfoUseCase>(GetDacInfoUseCase.Token).to(GetDacInfoUseCase);
    bind<GetDacTokensUseCase>(GetDacTokensUseCase.Token).to(
      GetDacTokensUseCase
    );

    /**
     * VOTING HISTORY
     */
    bind<VotingHistoryController>(VotingHistoryController.Token).to(
      VotingHistoryController
    );
    bind<GetUserVotingHistoryUseCase>(GetUserVotingHistoryUseCase.Token).to(
      GetUserVotingHistoryUseCase
    );

    bind<CandidatesVotersHistoryController>(
      CandidatesVotersHistoryController.Token
    ).to(CandidatesVotersHistoryController);
    bind<GetCandidatesVotersHistoryUseCase>(
      GetCandidatesVotersHistoryUseCase.Token
    ).to(GetCandidatesVotersHistoryUseCase);
    bind<CountVotersHistoryUseCase>(CountVotersHistoryUseCase.Token).to(
      CountVotersHistoryUseCase
    );
    bind<GetVotingPowerUseCase>(GetVotingPowerUseCase.Token).to(
      GetVotingPowerUseCase
    );

    /**
     * CANDIDATES
     */
    bind<GetMemberTermsUseCase>(GetMemberTermsUseCase.Token).to(
      GetMemberTermsUseCase
    );
    bind<GetMembersAgreedTermsUseCase>(GetMembersAgreedTermsUseCase.Token).to(
      GetMembersAgreedTermsUseCase
    );
    bind<GetVotedCandidateIdsUseCase>(GetVotedCandidateIdsUseCase.Token).to(
      GetVotedCandidateIdsUseCase
    );
    bind<GetCandidatesUseCase>(GetCandidatesUseCase.Token).to(
      GetCandidatesUseCase
    );
    bind<ListCandidateProfilesUseCase>(ListCandidateProfilesUseCase.Token).to(
      ListCandidateProfilesUseCase
    );
    bind<CandidatesController>(CandidatesController.Token).to(
      CandidatesController
    );

    /**
     * CUSTODIANS
     */
    bind<GetCustodiansUseCase>(GetCustodiansUseCase.Token).to(
      GetCustodiansUseCase
    );
    bind<ListCustodianProfilesUseCase>(ListCustodianProfilesUseCase.Token).to(
      ListCustodianProfilesUseCase
    );
    bind<CustodiansController>(CustodiansController.Token).to(
      CustodiansController
    );
  });

  await container.loadAsync(bindings);
  return container;
};
