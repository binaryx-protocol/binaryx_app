type Props = {
  id: string;
  activeTab: string;
  children: any;
}

export const TabContent = (props: Props) => {
  const {id, children, activeTab} = props;

  return (
    activeTab === id ? <div className="TabContent">
        {children}
      </div>
      : null
  );
};
