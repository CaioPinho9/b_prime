import { Button, Icon, Theme, useStyles } from "bold-ui";
import { useThemeContext } from "../store/theme/ThemeStore";

function ThemeButton() {
  const { changeTheme } = useThemeContext();
  const { classes } = useStyles(createStyles);

  return (
    <Button style={classes.button} skin="ghost" onClick={changeTheme}>
      <Icon icon="lightbulbFilled" />
    </Button>
  );
}

const createStyles = (theme: Theme) => ({
  button: {
    margin: "2px",
  } as React.CSSProperties,
});

export default ThemeButton;
