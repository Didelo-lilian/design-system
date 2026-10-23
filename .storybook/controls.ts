import type { Preview } from "@storybook/react-vite";

type ArgTypesEnhancer = NonNullable<Preview["argTypesEnhancers"]>[number];

/**
 * Picks the controls Storybook infers from the docgen:
 * - up to 3 options become inline radios, more become a select (the inferred radio list is tall in the docs table);
 * - a ReactNode prop is edited as text, hidden when the story passes an element, which text cannot edit.
 */
export const refineControls: ArgTypesEnhancer = ({ argTypes, initialArgs }) =>
  Object.fromEntries(
    Object.entries(argTypes).map(([name, argType]) => {
      const { type } = argType;
      if (!argType.control && type && "name" in type && type.name === "enum") {
        const control = type.value.length <= 3 ? "inline-radio" : "select";
        return [
          name,
          { ...argType, control: { type: control }, options: type.value },
        ];
      }
      if (argType.table?.type?.summary === "ReactNode") {
        const editable = ["string", "undefined"].includes(
          typeof initialArgs[name],
        );
        return [
          name,
          editable
            ? { ...argType, control: { type: "text" } }
            : { ...argType, table: { ...argType.table, disable: true } },
        ];
      }
      return [name, argType];
    }),
  );
