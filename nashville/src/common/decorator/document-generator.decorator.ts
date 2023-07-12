import { Type, applyDecorators } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  IntersectionType,
} from '@nestjs/swagger';

export const ApiType = (type: Type<unknown>): Type<unknown> =>
  IntersectionType(type, type);

type FunctionType = (args: unknown) => unknown;

/* The class `DocumentGeneratorParam` defines a parameter for a document generator with a name and a
type that can be a string, number, boolean, function type, or an array of function types. */
class DocumentGeneratorParam {
  name: string;
  type:
    | 'string'
    | 'number'
    | 'boolean'
    | string
    | FunctionType
    | Type<unknown>
    | [FunctionType];
}

/* The class DocumentGeneratorInfo contains information about a document generator, including a
summary, description, parameters, and possible response types for HTTP status codes 200 and 201. */
export class DocumentGeneratorInfo {
  summary: string;
  description?: string;
  exceptions?: string[];
  params?: DocumentGeneratorParam[];
  200?: Type<unknown> | Type<unknown>[];
  201?: Type<unknown> | Type<unknown>[];
}

/**
 * This is a TypeScript function that generates documentation for API operations based on provided
 * information.
 * @param {DocumentGeneratorInfo} documentGeneratorInfo - The parameter `documentGeneratorInfo` is an
 * object that contains information needed to generate documentation for an API endpoint. It includes
 * properties such as `summary`, `description`, `params`, and response codes such as `200` and `201`.
 * @returns A higher-order function that takes in a target, propertyKey, and descriptor and applies
 * decorators based on the information provided in the `documentGeneratorInfo` parameter.
 */
export function DocumentGenerator(
  documentGeneratorInfo: DocumentGeneratorInfo,
): <TFunction extends FunctionType, Y>(
  target: unknown | TFunction,
  propertyKey?: string | symbol,
  descriptor?: TypedPropertyDescriptor<Y>,
) => void {
  const decorators: MethodDecorator[] = [
    ApiOperation({
      summary: documentGeneratorInfo.summary,
      description: `${documentGeneratorInfo.description} || exceptions: ${documentGeneratorInfo.exceptions}`,
    }),
  ];

  if (documentGeneratorInfo[200]) {
    decorators.push(
      ApiOkResponse({
        description: 'Result',
        type: Array.isArray(documentGeneratorInfo[200])
          ? (documentGeneratorInfo[200] as unknown as Type<unknown>)
          : ApiType(documentGeneratorInfo[200]),
      }),
    );
  }

  if (documentGeneratorInfo[201]) {
    decorators.push(
      ApiOkResponse({
        description: 'Result',
        type: Array.isArray(documentGeneratorInfo[201])
          ? (documentGeneratorInfo[201] as unknown as Type<unknown>)
          : ApiType(documentGeneratorInfo[201]),
      }),
    );
  }

  if (documentGeneratorInfo.params) {
    documentGeneratorInfo.params.forEach((item: DocumentGeneratorParam) => {
      decorators.push(
        ApiParam({
          name: item.name,
          type: item.type,
        }),
      );
    });
  }

  return applyDecorators(...decorators);
}
