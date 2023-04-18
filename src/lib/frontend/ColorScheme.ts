import { theme } from "@svelteuidev/core"

export function buttonStyles(isDark: boolean): Record<"fg" | "hl", string>
{
    if (isDark)
    {
        return {
            fg: theme.colors.grape500.value,
            hl: theme.colors.grape200.value
        }
    }
    else
    {
        return { fg: "", hl: "" }
    }
}

export function cellStyles(isDark: boolean): Record<"hl1" | "hl2" | "digitColor", string>
{
    if (isDark)
    {
        return {
            hl1: theme.colors.grape900.value + "cf",
            hl2: theme.colors.grape600.value + "2f",
            digitColor: theme.colors.grape500.value + "ff"
        }
    }
    else
    {
        return {
            hl1: "",
            hl2: "",
            digitColor: ""
        }
    }
}