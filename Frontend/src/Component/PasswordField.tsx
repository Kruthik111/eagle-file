import { Stack, TextField } from "@mui/material";

const PasswordField = ({ passwordText, setPasswordText }) => {
  return (
    <Stack>
      <TextField
        id="standard-adornment-password"
        label="Password"
        error={passwordText.length > 0 && passwordText.length < 3}
        type={"text"}
        value={passwordText}
        onChange={(event) => setPasswordText(event.target.value)}
        helperText="password should be of atleast 3 character"
        slotProps={{ htmlInput: { maxLength: 10, p: "5px" } }}
      />
    </Stack>
  );
};

export default PasswordField;
