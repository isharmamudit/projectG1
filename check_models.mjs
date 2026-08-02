import { prebuiltAppConfig } from '@mlc-ai/web-llm';
console.log(prebuiltAppConfig.model_list.map(x => x.model_id).filter(id => id.includes('Llama-3.2')));
