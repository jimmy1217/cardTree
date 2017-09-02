export default (props) => {
    let imgageBlock, ripple;
    return (
        <div className="col-xs-12 col-sm-6 mb-20" onClick={(e) => props.onClick(imgageBlock, ripple, props.index, e)}>
            <div className="cardBlock">{props.iconClass && props.iconClass.length ? <i className={props.iconClass}></i> : null}{props.title}
                <div ref={el => imgageBlock = el} className={classNames("custom-image bg-img bg-img" + props.index % 4, { disabled: props.disabled })} />
                <span ref={el => ripple = el} className={classNames("ripple", { show: props.visible })}></span>
            </div>
        </div>
    );
};
