export class Place {
    constructor(provider, originalId, image, name, description, bookedDates, price, remoteness) {
        this.provider = provider;
        this.originalId = originalId;
        this.image = image;
        this.name = name;
        this.description = description;
        this.bookedDates = bookedDates;
        this.price = price;
        this.remoteness = remoteness;
    }
    get id() {
        return this.provider + "-" + this.originalId;
    }
    isProvidedBy(providerName) {
        return this.provider === providerName;
    }
}
