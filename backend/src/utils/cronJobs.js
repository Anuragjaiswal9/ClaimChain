import { CronJob } from "cron";
import { User } from "../models/user.model.js";

// this function will delete the user data from database if the user has not verified for more than a minute

const removeOldUnverifiedUsers = async () => {
  const cutoff = new Date(Date.now() - 60 * 1000); // 1 minute ago
  const {acknowledged, deletedCount} = await User.deleteMany({ isVerified: false, createdAt: { $lt: cutoff } });
  console.log(acknowledged, deletedCount);
  if(acknowledged){
      console.log(`${deletedCount} Unverified users older than 1 minutes have been deleted`);
  }
};

// Schedule to run every minutes (for testing, adjust as needed for production)

// this function will run every minutes and send the control to removeOldUnverifiedUsers() function

const scheduledTime = "* * * * *" // every minutes

const job = new CronJob(scheduledTime, async () => {
  await removeOldUnverifiedUsers();
  console.log("Job finished");
});

export const startCronJobs = () => {
  job.start();
  console.log("Cron jobs started");
};

//how calculation works
// 1000 miliseconds = 1 second
// 60 * 1000 = 60 seconds = 1 minute
// 60 * 60 * 1000 = 1 minute * 60 = 1 hour
// 24 * 60 * 60 * 1000 = 24 * 1 hour = 24 hours = 1 day


// *   *   *   *   *   *   *
// |   |   |   |   |   |   |
// |   |   |   |   |   |   +-- Day of the week (0 - 7) (Sunday to Saturday, both 0 and 7 represent Sunday)
// |   |   |   |   |   +------ Month (1 - 12)
// |   |   |   |   +---------- Day of the month (1 - 31)
// |   |   |   +-------------- Hour (0 - 23)
// |   |   +------------------ Minute (0 - 59)
// |   +---------------------- Second (0 - 59)
// +-------------------------- (Optional, if using cron with seconds) 


