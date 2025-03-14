import { UnexpectedError, UserError } from 'n8n-workflow';
import { BaseCommand } from './base-command';
import { Container } from '@n8n/di';
import { WorkflowRepository } from '@/databases/repositories/workflow.repository';
import { isWorkflowIdValid } from '@/utils';
import { InstalledNodes } from '@/databases/entities/installed-nodes';

export class Node extends BaseCommand {
	async init() {
		await super.init();
	}

	async run() {
		const { flags } = await this.parse(Node);

		// if (!flags.id) {
		// 	this.logger.info('"--id" has to be set!');
		// 	return;
		// }

		if (flags.file) {
			throw new UserError(
				'The --file flag is no longer supported. Please first import the workflow and then execute it using the --id flag.',
				{ level: 'warning' },
			);
		}

		const nodeId = flags.id;
		const nodes = await Container.get(InstalledNodes);

		// this.logger.info(`dgl nodes ${nodes}`);
	}

	async catch(error: Error) {
		this.logger.error('Error in node command:');
		this.logger.error(error.message);
	}
}
