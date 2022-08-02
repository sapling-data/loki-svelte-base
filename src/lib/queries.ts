import type { LokiEntity, QueryOptions, Workflow } from "./validators";
import { workflowValidator } from "./validators";

export const queryLoki = async (queryOptions: QueryOptions) => {
  // @ts-ignore
  const query = await loki.data.query(queryOptions);
  return query.results;
};

export const loadEntity = async (urn: string, view: string) => {
  // @ts-ignore
  return await loki.data.loadEntity(urn, view);
}

export const saveEntity = async (entity: LokiEntity, view: string) => {
  // @ts-ignore
  return await loki.data.saveEntity(entity.urn, entity, view);
};

export const fetchWorkflows = async (): Promise<Workflow[]> => {
  const results = await queryLoki({
    queryUrn: 'urn:com:loki:examples:model:queries:fetchWorkflows',
    mapResults: true,
  });
  return results.map((result: Workflow) => {
    return workflowValidator.parse(result);
  });
};

export const fetchWorkflow = async (workflowUrnSegment: string): Promise<Workflow> => {
  const workflowUrn = `urn:com:loki:examples-data:data:workflows:${workflowUrnSegment}`;
  const result = await loadEntity(workflowUrn, 'urn:com:loki:examples:model:types:workflow');
  return workflowValidator.parse(result);
};
