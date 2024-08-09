import mongoose, { Document, Schema, Model } from 'mongoose';

interface ICredential extends Document {
  userId: string;
  token: string;
  createdAt?: Date;
}

const CredentialSchema: Schema<ICredential> = new Schema({
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

const Credential: Model<ICredential> = mongoose.model<ICredential>('Credential', CredentialSchema);
export default Credential;

