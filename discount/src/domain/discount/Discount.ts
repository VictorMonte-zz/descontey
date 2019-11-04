export class Discount {

    protected porcent: number;
    protected valueInCents: number;

    constructor(porcent: number) {
        this.porcent = porcent;
        this.valueInCents = 0;
    }

    public getPorcent(): number {
        return this.porcent;
    }

    public getValueInCents(): number {
        return this.valueInCents;
    }

    protected calculateDiscount(priceInCents: number) {
        const price = (priceInCents / 100);
        const value = (price * ( this.porcent / 100 ));

        this.valueInCents = value * 100;
    }
}

export default Discount;