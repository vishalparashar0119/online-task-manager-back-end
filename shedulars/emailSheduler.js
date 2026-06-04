import cron from 'node-cron';
import sendEmail from '../utils/sendMail.js';
import TaskModal from '../modals/Task.js';

// Runs every day at 9:00 AM
cron.schedule('0 9 * * * ', async () => {
    try {
        console.log("send email scheduler run");

        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);

        const endOfTomorrow = new Date();
        endOfTomorrow.setDate(endOfTomorrow.getDate() + 1);
        endOfTomorrow.setHours(23, 59, 59, 999);

        const tasks = await TaskModal.find({
            dueDate: {
                $gte: startOfToday,
                $lte: endOfTomorrow
            }
        });

        console.log(tasks);

        for (const task of tasks) {
            await sendEmail(
                task.createdBy.email,
                'Task Due Tomorrow',
                `Reminder: "${task.name}" is due tomorrow.`
            );

            task.reminderSent = true;
            await task.save();
        }

        console.log(`Sent reminders for ${tasks.length} tasks`);
    } catch (error) {
        console.error(error);
    }
});