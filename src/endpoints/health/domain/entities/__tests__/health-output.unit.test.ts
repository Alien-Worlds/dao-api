import { HealthOutput } from '../health-output';
import { HealthOutputDocument } from '../../../data/dtos/health.dto';
/*imports*/
/*mocks*/
const healthOutputDto: HealthOutputDocument = {
    status: 'OK',
    version: '1.0.0',
    timestamp: new Date('2023-02-15T13:41:25.153Z'),
    uptimeSeconds: 100,
    nodeVersion: 'v17.3.0',
    database: {
        status: 'OK',
    },
    dependencies: [
        {
            name: '@alien-worlds/api-core',
            version: '0.0.68'
        },
        {
            name: '@alien-worlds/eosdac-api-common',
            version: '0.0.76'
        }
    ],
    blockChainHistory: {
        currentBlock: 0n,
    }
};

describe('HealthOutput unit tests', () => {
    it('HealthOutput.fromDto should return HealthOutput object based on the provided dto', async () => {
        const healthOutput = HealthOutput.fromDto(healthOutputDto);

        expect(healthOutput).toEqual(healthOutputDto);
    });

    it('"toDto" should return a dto based on entity', async () => {
        const healthOutput = HealthOutput.fromDto(healthOutputDto);

        expect(healthOutput.toDto()).toEqual(healthOutputDto);
    });

    it('"toJson" should return an object based on entity', async () => {
        const healthOutput = HealthOutput.fromDto(healthOutputDto);

        expect(healthOutput.toJson()).toEqual({
            status: 'OK',
            version: '1.0.0',
            timestamp: 1676468485153,
            uptimeSeconds: 100,
            nodeVersion: 'v17.3.0',
            dependencies: {
                '@alien-worlds/api-core': '0.0.68',
                '@alien-worlds/eosdac-api-common': '0.0.76'
            },
            database: { status: 'OK' },
            blockChainHistory: { currentBlock: '0' }
        });
    });

    /*unit-tests*/
});

