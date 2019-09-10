export interface Issue {
  title: String,
  created_at: {
      type: Date,
      default: Date;
  },
  resolved: {
      type: Boolean,
      default: false
  },
  resolved_at: Date
}