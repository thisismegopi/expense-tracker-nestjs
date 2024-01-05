import { Injectable } from '@nestjs/common';
import { ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from 'class-validator';
import { utc, now } from 'moment';

@ValidatorConstraint({ name: 'isBefore' })
@Injectable()
export class Customvalidation implements ValidatorConstraintInterface {
    validate(value: string): boolean {
        if (!utc(value).isValid()) return false;
        if (!utc(value).isBefore(now())) return false;
        return true;
    }
}

/**
 * Checks if the string is a valid past time.
 * If given value is not valid, then it returns false.
 */
export function isBefore(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: Customvalidation,
        });
    };
}
