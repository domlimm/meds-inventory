class Medicine {
  constructor(
    id,
    name,
    takeWhenNeeded,
    startDate,
    endDate,
    frequency,
    quantitySum,
    expiry,
    dosage,
    imageUrl,
    iconId,
    instructions,
    scheduleConfigured,
    refillConfigured
  ) {
    this.id = id;
    this.name = name;
    this.takeWhenNeeded = takeWhenNeeded;
    this.startDate = startDate;
    this.endDate = endDate;
    this.frequency = frequency;
    this.quantitySum = quantitySum;
    this.expiry = expiry;
    this.dosage = dosage;
    this.imageUrl = imageUrl;
    this.iconId = iconId;
    this.instructions = instructions;
    this.scheduleConfigured = scheduleConfigured;
    this.refillConfigured = refillConfigured;
  }
}

export default Medicine;
