interface Props {
  className: string;
  text: string;
}

export const Feedback = ({ className, text }: Props) => {
  return (
    <div className={className} style={{ display: 'block' }}>
      {text}
    </div>
  );
};
