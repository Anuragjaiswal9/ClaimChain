import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizontal } from "lucide-react";
import socketAPI from "@/services/socketAPI";
import { formatAMPM } from "@/utils/utilities.js";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

function MessageBox({ senderId, receiverId, onMessageSubmit }) {
  const form = useForm({
    defaultValues: {
      message: "",
    },
    mode: "onSubmit", // Validation only on submit
  });

  const onSubmit = (data) => {
    const messageData = {
      message: data.message,
      isSent: senderId !== receiverId, // Indicates whether the message is sent
      timestamp: formatAMPM(new Date()), // Format the current time
    };

    // console.log("sent message", messageData);
    onMessageSubmit(messageData);
    socketAPI.sendPrivateMessage(senderId, receiverId, messageData);

    form.reset({ message: "" });
  };

  return (
    <Form {...form} className="w-[100%]">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-4 justify-center items-center mx-2 w-[100%]"
      >
        <FormField
          control={form.control}
          name="message"
          rules={{ required: true }} // Make message required without a custom message
          render={({ field }) => (
            <FormItem className="w-[100%]">
              <FormControl>
                <Input placeholder="Message" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">
          <SendHorizontal />
        </Button>
      </form>
    </Form>
  );
}

export default MessageBox;
