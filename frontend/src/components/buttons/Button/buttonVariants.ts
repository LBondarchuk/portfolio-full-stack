export const baseStyles = `
    relative
    isolate
    overflow-hidden
    rounded-xl
    px-4
    py-2
    font-medium
    select-none
    transition-colors
    duration-200
  `;

export const variantStyles = {
  default: `
      bg-primary
      text-white
      shadow-sm
      shadow-primary/20
      hover:bg-primary-hover
      hover:shadow-lg
      hover:shadow-primary/25
    `,

  outlined: `
      border
      border-primary/30
      bg-surface
      text-primary
      shadow-sm
      hover:border-primary/60
      hover:bg-primary/10
      hover:shadow-md
      hover:shadow-primary/10
    `,

  danger: `
      bg-red-50
      text-danger
      shadow-sm
      shadow-red-500/10
      hover:bg-red-100
      hover:shadow-md
      hover:shadow-red-500/15
    `,

  ghost: `
      bg-transparent
      text-text-secondary
      hover:bg-gray-light
      hover:text-text
    `,
};

