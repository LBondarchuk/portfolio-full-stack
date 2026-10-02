type PageHeaderProps = {
  title: string;
  description: string;
};

const PageHeader = ({
  title,
  description,
}: PageHeaderProps) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-text">
        {title}
      </h1>

      <p className="mt-1 text-base text-text-secondary">
        {description}
      </p>
    </div>
  );
};

export default PageHeader;