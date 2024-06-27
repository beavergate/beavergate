import User from "../models/User";

interface IUser {
  userId: string;
  name: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Function to create a new user
export const createUser = async (userData: IUser): Promise<IUser> => {
  const user = new User(userData);
  await user.save();
  return user.toObject() as IUser;
};

// Function to get a user by ID
export const getUserById = async (userId: string): Promise<IUser | null> => {
  const user = await User.findById(userId).lean().exec();
  return user as IUser | null;
};

// Function to update a user
export const updateUser = async (
  userId: string,
  updateData: Partial<IUser>
): Promise<IUser | null> => {
  const user = await User.findByIdAndUpdate(userId, updateData, { new: true }).lean().exec();
  return user as IUser | null;
};

// Function to delete a user
export const deleteUser = async (userId: string): Promise<void> => {
  await User.findByIdAndDelete(userId).exec();
};
