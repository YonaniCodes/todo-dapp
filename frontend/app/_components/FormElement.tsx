import { Label } from "@/components/ui/label";

interface FormElementProps {
  label: string;
  errorMsg?: string;
  children: React.ReactNode;
}

const FormElement: React.FC<FormElementProps> = ({
  label,
  errorMsg,
  children,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor={label.toLowerCase()}>{label}</Label>
      {children}
      {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
    </div>
  );
};

export default FormElement;
