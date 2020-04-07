class Medicine {
  constructor(id, name, expiry, dosage, image, additionalRemarks, configured) {
    this.id = id;
    this.name = name;
    this.expiry = expiry;
    this.dosage = dosage;
    this.image = image;
    this.additionalRemarks = additionalRemarks;
    this.configured = configured;
  }
}

export default Medicine;
