import React, { Fragment, FunctionComponent } from 'react';

import { preventDefault } from '../../common/dom';
import { withCurrency, TranslatedString, WithCurrencyProps } from '../../locale';
import { CheckboxFormField } from '../../ui/form';
import { Tooltip, TooltipTrigger } from '../../ui/tooltip';

export interface StoreCreditFieldProps {
    availableStoreCredit: number;
    name: string;
    usableStoreCredit: number;
    onChange?(value: boolean): void;
}

const StoreCreditField: FunctionComponent<StoreCreditFieldProps & WithCurrencyProps> = ({
    availableStoreCredit,
    currency,
    name,
    onChange,
    usableStoreCredit,
}) => (
    // FIXME: investigating splitting withLocale HOC into withLanguage and withCurrency
    // and embbed this condition in the withCurrency HOC.
    !currency ? null :
    <CheckboxFormField
        name={ name }
        labelContent={
            <Fragment>
                <TranslatedString id="redeemable.apply_store_credit_before_action" />

                { ' ' }

                <TooltipTrigger placement="top-start" tooltip={
                    <Tooltip testId="payment-store-credit-tooltip">
                        <TranslatedString
                            id="redeemable.store_credit_available_text"
                            data={ { storeCredit: currency.toCustomerCurrency(availableStoreCredit) } }
                        />
                    </Tooltip>
                }>
                    <a href="#" onClick={ preventDefault() }>
                        { currency.toCustomerCurrency(usableStoreCredit) }
                    </a>
                </TooltipTrigger>

                { ' ' }

                <TranslatedString id="redeemable.apply_store_credit_after_action" />
            </Fragment>
        }
        onChange={ onChange }
    />
);

export default withCurrency(StoreCreditField);
