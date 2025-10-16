"use client";

import { Button, Checkbox, Group, TextInput, Textarea } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

export default function Form() {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      firstname: "",
      lastname: "",
      phone: "",
      datetime: new Date(),
      message: "",
      email: "",
      termsOfService: false,
    },

    validate: {
      firstname: (value) =>
        value.trim().length > 0 ? null : "First name missing",

      lastname: (value) =>
        value.trim().length > 0 ? null : "Last name missing",

      phone: (value) =>
        /^[+0-9\s-]{5,}$/.test(value) ? null : "Enter a valid phone number",

      datetime: (value) =>
        value instanceof Date && !isNaN(value.getTime())
          ? null
          : "Please select a valid date and time",
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <TextInput
        withAsterisk
        label="First name"
        placeholder="John"
        key={form.key("firstname")}
        {...form.getInputProps("firstname")}
      />

      <TextInput
        withAsterisk
        label="Last name"
        placeholder="Doe"
        key={form.key("lastname")}
        {...form.getInputProps("lastname")}
        mt="md"
      />

      <TextInput
        label="Phone"
        placeholder="+372 5555 5555"
        key={form.key("phone")}
        {...form.getInputProps("phone")}
        mt="md"
      />

      <DateTimePicker
        label="Date and time"
        key={form.key("datetime")}
        {...form.getInputProps("datetime")}
        mt="md"
      />

      <Textarea
        label="Message"
        placeholder="Your message..."
        minRows={3}
        key={form.key("message")}
        {...form.getInputProps("message")}
        mt="md"
      />

      <TextInput
        withAsterisk
        label="Email"
        placeholder="your@email.com"
        key={form.key("email")}
        {...form.getInputProps("email")}
        mt="md"
      />

      <Checkbox
        mt="md"
        label="I agree to sell my privacy"
        key={form.key("termsOfService")}
        {...form.getInputProps("termsOfService", { type: "checkbox" })}
      />

      <Group justify="flex-end" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}
