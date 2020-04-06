class Medicine {
  constructor(id, name, expiry, dosage, img, additionalRemarks, configured) {
    this.id = id;
    this.name = name;
    this.expiry = expiry;
    this.dosage = dosage;
    this.img = img;
    this.additionalRemarks = additionalRemarks;
    this.configured = configured;
  }
}

export default Medicine;
