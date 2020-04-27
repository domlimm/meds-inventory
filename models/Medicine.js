class Medicine {
  constructor(id, name, expiry, dosage, imageUrl, iconId, instructions, configured) {
    this.id = id;
    this.name = name;
    this.expiry = expiry;
    this.dosage = dosage;
    this.imageUrl = imageUrl;
    this.iconId = iconId;
    this.instructions = instructions;
    this.configured = configured;
  }
}

export default Medicine;
