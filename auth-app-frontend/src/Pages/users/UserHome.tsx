import {
  Activity,
  ShieldCheck,
  Users,
  BarChart3,
} from "lucide-react";

const UserHome = () => {
  return (
    <div className="min-h-screen  text-black dark:text-white px-4 py-6 transition-colors duration-300">
      
      {/* Heading */}
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 tracking-tight">
        Dashboard Overview
      </h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Card 1 */}
        <div className="bg-[#f5f5f5] dark:bg-[#0d0d0d] border border-zinc-200 dark:border-[#1f1f1f] rounded-2xl p-4 hover:border-zinc-400 dark:hover:border-zinc-700 transition-all">
          
          <div className="flex items-center gap-3">
            <div className="bg-white dark:bg-[#1a1a1a] p-2.5 rounded-xl">
              <Users
                className="text-zinc-700 dark:text-zinc-300"
                size={20}
              />
            </div>

            <div>
              <p className="text-zinc-500 dark:text-zinc-400 text-xs">
                Total Logins
              </p>

              <h2 className="text-xl font-bold mt-1">
                1,245
              </h2>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-[#f5f5f5] dark:bg-[#0d0d0d] border border-zinc-200 dark:border-[#1f1f1f] rounded-2xl p-4 hover:border-zinc-400 dark:hover:border-zinc-700 transition-all">
          
          <div className="flex items-center gap-3">
            <div className="bg-white dark:bg-[#1a1a1a] p-2.5 rounded-xl">
              <ShieldCheck
                className="text-zinc-700 dark:text-zinc-300"
                size={20}
              />
            </div>

            <div>
              <p className="text-zinc-500 dark:text-zinc-400 text-xs">
                Security Score
              </p>

              <h2 className="text-xl font-bold mt-1">
                98%
              </h2>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-[#f5f5f5] dark:bg-[#0d0d0d] border border-zinc-200 dark:border-[#1f1f1f] rounded-2xl p-4 hover:border-zinc-400 dark:hover:border-zinc-700 transition-all">
          
          <div className="flex items-center gap-3">
            <div className="bg-white dark:bg-[#1a1a1a] p-2.5 rounded-xl">
              <Activity
                className="text-zinc-700 dark:text-zinc-300"
                size={20}
              />
            </div>

            <div>
              <p className="text-zinc-500 dark:text-zinc-400 text-xs">
                Active Sessions
              </p>

              <h2 className="text-xl font-bold mt-1">
                12
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-6 bg-[#f5f5f5] dark:bg-[#0d0d0d] border border-zinc-200 dark:border-[#1f1f1f] rounded-2xl p-5 min-h-[220px]">
        
        <div className="flex items-center gap-2 mb-5">
          <BarChart3
            className="text-zinc-700 dark:text-zinc-300"
            size={18}
          />

          <h2 className="text-lg font-semibold">
            Recent Activity
          </h2>
        </div>

        <ul className="space-y-4 text-zinc-600 dark:text-zinc-400 text-sm">
          <li>• Logged in from Chrome (Windows)</li>
          <li>• Password updated</li>
          <li>• New device added to trusted list</li>
          <li>• Logged out from Safari (iPhone)</li>
        </ul>
      </div>

      {/* Button */}
      <div className="flex justify-center mt-8">
        <button className="bg-black dark:bg-white text-white dark:text-black text-sm font-semibold px-6 py-2.5 rounded-full hover:scale-105 transition-all duration-200">
          Explore More
        </button>
      </div>
    </div>
  );
};

export default UserHome;