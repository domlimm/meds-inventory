class Medicine {
  constructor(
    id,
    name,
    takeWhenNeeded,
    startDate,
    endDate,
    frequency,
    quantity,
    expiry,
    dosage,
    imageUrl,
    iconId,
    instructions,
    configured
  ) {
    this.id = id;
    this.name = name;
    this.takeWhenNeeded = takeWhenNeeded;
    this.startDate = startDate;
    this.endDate = endDate;
    this.frequency = frequency;
    this.quantity = quantity;
    this.expiry = expiry;
    this.dosage = dosage;
    this.imageUrl = imageUrl;
    this.iconId = iconId;
    this.instructions = instructions;
    this.configured = configured;
  }
}

export default Medicine;
