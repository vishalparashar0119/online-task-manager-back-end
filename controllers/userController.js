import UserModal from "../modals/User.js";

export const getUser = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id;

    const user = await UserModal.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    console.log("User Controller : Get User ::", error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id;

    const { fullName, email } = req.body;

    const updatedUser = await UserModal.findByIdAndUpdate(
      userId,
      {
        fullName,
        email,
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log("User Controller : Update User ::", error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};