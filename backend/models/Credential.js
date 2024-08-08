import mongoose from 'mongoose';

const CredentialSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Credential = mongoose.model('Credential', CredentialSchema);
export default Credential;
