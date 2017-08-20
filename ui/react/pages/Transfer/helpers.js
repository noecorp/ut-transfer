import { bics } from './commonStaticData';

export const getIbanInfo = (iban) => {
    let bicIdentifier = iban.substr(4, 4).toUpperCase();
    let correspondingBic = bics.find(bic => bic.identifier === bicIdentifier);
    if (correspondingBic) {
        return {
            bic: correspondingBic.bic,
            bank: correspondingBic.bank.toUpperCase()
        };
    };
};
