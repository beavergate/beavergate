import dynamoose from "../lib/dynamoose";

const UserSchema = new dynamoose.Schema(
  {
    userId: {
      type: String,
      hashKey: true,
    },
    name: String,
    email: String,
    createdAt: {
      type: Date,
      default: () => new Date(),
    },
    updatedAt: {
      type: Date,
      default: () => new Date(),
    },
  },
  {
    timestamps: true,
  }
);

const User = dynamoose.model("User", UserSchema);

export default User;
