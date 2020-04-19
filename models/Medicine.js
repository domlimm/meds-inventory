class Medicine {
  constructor(id, name, expiry, dosage, imageUrl, iconId, additionalRemarks, configured) {
    this.id = id;
    this.name = name;
    this.expiry = expiry;
    this.dosage = dosage;
    this.imageUrl = imageUrl;
    this.iconId = iconId;
    this.additionalRemarks = additionalRemarks;
    this.configured = configured;
  }
}

export default Medicine;
