import { ValidateBy, ValidationOptions, buildMessage } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

export const ID_UU_ID = 'isUUId';

/**
 * Checks if the string is a valid hex-encoded representation of a MongoDB ObjectId.
 * If given value is not a string, then it returns false.
 */
export function IsObjectId(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return ValidateBy(
    {
      name: ID_UU_ID,
      validator: {
        validate: (value): boolean => {
          return uuidv4.validate(value);
        },
        defaultMessage: buildMessage(
          (eachPrefix) => eachPrefix + '$property must be a UUID',
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}
