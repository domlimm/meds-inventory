class Medicine {
  constructor(
    id,
    name,
    expiry,
    dosage,
    imageUrl,
    additionalRemarks,
    configured
  ) {
    this.id = id;
    this.name = name;
    this.expiry = expiry;
    this.dosage = dosage;
    this.imageUrl = imageUrl;
    this.additionalRemarks = additionalRemarks;
    this.configured = configured;
  }
}

export default Medicine;
