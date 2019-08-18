import { PaymentMethod } from '@bigcommerce/checkout-sdk';
import React, { FunctionComponent } from 'react';

import { preventDefault } from '../../common/dom';
import { withLanguage, TranslatedString, WithLanguageProps } from '../../locale';

import getPaymentMethodName from './getPaymentMethodName';

export interface SignOutLinkProps {
    method: Partial<PaymentMethod> & Pick<PaymentMethod, 'id'>;
    onSignOut(): void;
}

const SignOutLink: FunctionComponent<SignOutLinkProps & WithLanguageProps> = ({
    language,
    method,
    onSignOut,
}) => (
    <div className="signout-link">
        <TranslatedString id="remote.sign_out_before_action" />

        { ' ' }

        <a href="#" onClick={ preventDefault(onSignOut) }>
            <TranslatedString
                id="remote.sign_out_action"
                data={ { providerName: getPaymentMethodName(language)(method) } }
            />
        </a>

        { ' ' }

        <TranslatedString id="remote.sign_out_after_action" />
    </div>
);

export default withLanguage(SignOutLink);
