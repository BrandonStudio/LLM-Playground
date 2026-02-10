import * as React from "react"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { Command, CommandEmpty, CommandGroup, CommandItem } from "./command"

interface InputCommandProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  value?: string
  onValueChange?: (value: string) => void
  options?: Array<{ value: string; label: string }>
  placeholder?: string
  emptyMessage?: string
}

const InputCommand = React.forwardRef<HTMLInputElement, InputCommandProps>(
  ({ className, value, onValueChange, options = [], placeholder = "Type to search...", emptyMessage = "No results found.", ...props }, ref) => {
    const [open, setOpen] = React.useState(false)
    const [inputValue, setInputValue] = React.useState(value || "")

    React.useEffect(() => {
      setInputValue(value || "")
    }, [value])

    const handleSelect = (selectedValue: string) => {
      setInputValue(selectedValue)
      onValueChange?.(selectedValue)
      setOpen(false)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setInputValue(newValue)
      onValueChange?.(newValue)
      setOpen(true)
    }

    const filteredOptions = options.filter((option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    )

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <input
            ref={ref}
            type="text"
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            value={inputValue}
            onChange={handleInputChange}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            {...props}
          />
        </PopoverTrigger>
        {filteredOptions.length > 0 && (
          <PopoverContent className="w-full p-0" align="start">
            <Command>
              <CommandEmpty>{emptyMessage}</CommandEmpty>
              <CommandGroup>
                {filteredOptions.map((option) => (
                  <CommandItem
                    key={option.value}
                    onSelect={() => handleSelect(option.value)}
                  >
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        )}
      </Popover>
    )
  }
)
InputCommand.displayName = "InputCommand"

export { InputCommand }
