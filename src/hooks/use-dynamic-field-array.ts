import { useFieldArray, Control, UseFormSetValue, UseFormWatch, FieldValues, ArrayPath, FieldArray } from 'react-hook-form';

type DynamicFieldArrayOptions<T extends FieldValues = FieldValues> = {
  control: Control<T>;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
  name: ArrayPath<T>;
  initialItem: FieldArray<T, ArrayPath<T>>;
  rules?: { minLength?: number, maxLength?: number };
};

export function useDynamicFieldArray<T extends FieldValues = FieldValues>({
  control,
  setValue,
  watch,
  name,
  initialItem,
  rules = { minLength: 0, maxLength: 5 },
}: DynamicFieldArrayOptions<T>) {
  const { fields, append, remove } = useFieldArray<T>({ control, name, rules });

  const watchedItems = watch(name);
  const editingIndex = watch('editingIndex') as number | null;
  const isAddingNew = watch('isAddingNew') as boolean;

  const handleAddNew = () => {
    setValue('isAddingNew', true);
    setValue('editingIndex', null);
    append(initialItem as FieldArray<T, ArrayPath<T>>);
  };

  const handleEdit = (index: number) => {
    setValue('editingIndex', index);
    setValue('isAddingNew', false);
  };

  const handleSave = () => {
    setValue('isAddingNew', false);
    setValue('editingIndex', null);
  };

  const handleRemove = (index: number) => {
    remove(index);
    if (editingIndex === index) {
      setValue('editingIndex', null);
      setValue('isAddingNew', false);
    }
  };

  const handleCancelEdit = () => {
    if (editingIndex !== null) {
      setValue('editingIndex', null);
    } else if (isAddingNew) {
      remove(fields.length - 1);
      setValue('isAddingNew', false);
    }
  };

  return {
    fields,
    watchedItems,
    editingIndex,
    isAddingNew,
    handleAddNew,
    handleEdit,
    handleSave,
    handleRemove,
    handleCancelEdit,
  };
}
