import { Camera, Mail, CalendarDays, ShieldCheck } from "lucide-react";
import useAuth from "../../Auth/Store";
import { useEffect, useRef, useState } from "react";
import { uploadProfileImage } from "../../Services/UploadImage";
import toast from "react-hot-toast";
import { Button } from "../../components/ui/button";
import { updateUserInfo } from "../../Services/AuthService";
// import { updateUserInfo } from "../../Services/UpdateUserInfo";

const UserProfile = () => {
  const updateUser = useAuth((state) => state.updateUser);
  const user = useAuth((state) => state.user);
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    name:"",
    bio:"",
    specialName:""
  })

  useEffect(() => {
    if (user) {
      setData({
        name : user.name || "",
        bio : user.bio || "",
        specialName: user.specialName || ""
      })
    }
  }, [user]);

  const uploadImage = () => {
    if (loading) return;
    inputRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const tempImage = URL.createObjectURL(file);
    setPreviewImage(tempImage);

    try {
      setLoading(true);
      const updatedUser = await uploadProfileImage(file);
      updateUser(updatedUser);
      toast.success("Profile Image Updated");

    } catch (error) {
      setPreviewImage("");
      toast.error("Cannot Update");
      console.log(error);

    } finally {
      setLoading(false);

      URL.revokeObjectURL(tempImage);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      if (data.name.trim().length < 3) {
        toast.error("Name too short");
        return;
      }

      const updatedUser = await updateUserInfo(data);

      updateUser(updatedUser);
      toast.success("Profile Updated");
      setEditMode(false);
      
    } catch (error: any) {
      toast.error("Cannot Update");
      console.log(error.message);
      console.log(error.status);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
  setData({
    name: user?.name || "",
    bio: user?.bio || "",
    specialName: user?.specialName || "",
  });

  setEditMode(false);
};

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData((value) => ({
      ...value,
      [event.target.name]: event.target.value,
    }));
  }

  return (
    <div className="min-h-screen  flex justify-center items-start px-4 py-10 transition-colors">
      <div className="w-full max-w-md rounded-3xl border border-zinc-300 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 shadow-xl overflow-hidden">
        {/* top section */}
        <div className="flex flex-col items-center px-6 py-8 border-b border-zinc-300 dark:border-zinc-800">
          {/* hidden input */}
          <input
            type="file"
            accept="image/*"
            ref={inputRef}
            className="hidden"
            onChange={handleImageChange}
          />

          {/* image */}
          <div
            onClick={uploadImage}
            className="relative h-24 w-24 rounded-full overflow-hidden border-2 border-zinc-400 dark:border-zinc-700 cursor-pointer group"
          >
            {previewImage || user?.image ? (
              <img
                src={previewImage || user?.image}
                alt="profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full flex justify-center items-center bg-zinc-200 dark:bg-zinc-800">
                <Camera size={34} />
              </div>
            )}

            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex justify-center items-center">
              <Camera className="text-white" size={20} />
            </div>
          </div>

          {/* name */}
          {editMode ? (
            <input
               name="name"
              value={data.name}
              onChange={handleInputChange}
              className="mt-4 bg-transparent border border-zinc-400 dark:border-zinc-700 rounded-xl px-3 py-2 text-center outline-none w-full"
            />
          ) : (
            <h1 className="mt-4 text-2xl font-bold text-black dark:text-white text-center break-all">
              {user?.name}
            </h1>
          )}

          {/* username */}
          {editMode ? (
            <input
              name="specialName"
              value={data.specialName}
              onChange={handleInputChange}
              placeholder="Username"
              className="mt-3 bg-transparent border border-zinc-400 dark:border-zinc-700 rounded-xl px-3 py-2 text-center outline-none w-full"
            />
          ) : (
            <p className="text-zinc-500 dark:text-zinc-400 mt-1">
              @{user?.specialName || "username"}
            </p>
          )}

          {/* bio */}
          {editMode ? (
            <input
              name="bio"
              value={data.bio}
              onChange={handleInputChange}
              placeholder="Write your bio..."
              className="mt-4 bg-transparent border border-zinc-400 dark:border-zinc-700 rounded-xl px-3 py-3 outline-none resize-none w-full "
            />
          ) : (
            <p className="text-sm text-center text-zinc-600 dark:text-zinc-400 mt-4 leading-relaxed">
              {user?.bio || "No bio added yet."}
            </p>
          )}
        </div>

        {/* info section */}
        <div className="px-6 py-6 space-y-5">
          {/* email */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
              <Mail size={18} />
              <span>Email</span>
            </div>

            <span className="text-sm text-right break-all text-black dark:text-white">
              {user?.email}
            </span>
          </div>

          {/* joined */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
              <CalendarDays size={18} />
              <span>Joined</span>
            </div>

            <span className="text-sm text-black dark:text-white">
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "Not Available"}
            </span>
          </div>

          {/* provider */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
              <ShieldCheck size={18} />
              <span>Provider</span>
            </div>

            <span className="text-sm uppercase text-black dark:text-white">
              {user?.provider}
            </span>
          </div>

          {/* buttons */}
          <div className="pt-4 flex gap-3">
            {editMode ? (
              <>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={handleCancel}
                  disabled={loading}
                >
                  Cancel
                </Button>

                <Button
                  className="flex-1"
                  onClick={handleSave}
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save"}
                </Button>
              </>
            ) : (
              <Button className="w-full" onClick={() => setEditMode(true)}>
                Edit Profile
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
