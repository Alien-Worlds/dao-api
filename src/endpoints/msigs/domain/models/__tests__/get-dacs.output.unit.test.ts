/*
import * as AlienWorldsCommon from '@alien-worlds/aw-contract-alien-worlds';
import * as DaoWorldsCommon from '@alien-worlds/aw-contract-dao-worlds';
import * as IndexWorldsCommon from '@alien-worlds/aw-contract-index-worlds';
import * as TokenWorldsCommon from '@alien-worlds/aw-contract-token-worlds';

import { DacMapper } from '@endpoints/dacs/data/mappers/dacs.mapper';
import { MSIGAggregateRecord } from '../msig-aggregate-record';
import { GetMSIGSOutput } from '../get-msigs.output';
import { Result } from '@alien-worlds/aw-core';

const dacDir = new DacMapper().toDac(
  new IndexWorldsCommon.Deltas.Mappers.DacsRawMapper().toEntity({
    accounts: [],
    symbol: { symbol: 'EYE', contract: '' },
    refs: [],
  })
);

const dacTreasury =
  new AlienWorldsCommon.Deltas.Mappers.AccountsRawMapper().toEntity({
    balance: 'string',
  });

const dacGlobals =
  new DaoWorldsCommon.Deltas.Mappers.DacglobalsRawMapper().toEntity({
    data: [],
  });

const dacStats = new TokenWorldsCommon.Deltas.Mappers.StatRawMapper().toEntity({
  supply: 'string',
  max_supply: 'string',
  issuer: 'string',
  transfer_locked: false,
});

describe('GetDacsOutput Unit tests', () => {
  it('"GetDacsOutput.create" should create instance', async () => {
    const output = GetMSIGSOutput.create(
      Result.withContent([
        MSIGAggregateRecord.create(dacDir, dacTreasury, dacGlobals, dacStats),
      ])
    );

    expect(output).toBeInstanceOf(GetMSIGSOutput);
  });

  it('GetDacsOutput.toJson should return json object', async () => {
    const output = GetMSIGSOutput.create(
      Result.withContent([
        MSIGAggregateRecord.create(dacDir, dacTreasury, dacGlobals, dacStats),
      ])
    );

    expect(output.toJSON()).toBeInstanceOf(Object);
  });
});
*/
