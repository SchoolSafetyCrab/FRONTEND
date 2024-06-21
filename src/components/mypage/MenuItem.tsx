import '@styles/mypage/MenuItem.css';

interface Props {
  readonly title: string;
  // eslint-disable-next-line react/require-default-props
  readonly onClick?: () => void;
}
export default function MenuItem({ title, onClick }: Props) {
  return (
    <div>
      <button className="button" type="button" onClick={onClick}>
        {title}
      </button>
    </div>
  );
}
