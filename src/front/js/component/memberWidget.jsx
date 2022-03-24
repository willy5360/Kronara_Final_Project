import React, { Fragment, useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/memberWidget.scss";

const MemberWidget = () => {
    const { store, actions } = useContext(Context);
    const [widget, setWidget] = useState([]);
    const [selectedMember, setSelectedMember] = useState(store.currentMember);

    // useEffect(() => {
    //     actions.getMembers();
    // }, [store.currentHome]);

    useEffect(() => {
        console.log("selectedMember en widget", selectedMember);

        if (store.currentHome.length != 0) {
            setWidget(
                store.member.map((mappedMember, index) => {
                    if (mappedMember.id == selectedMember.id) {
                        return (
                            <img
                                key={index.toString()}
                                className="memberWidget--profile currentMember"
                                src={mappedMember.photo_user}
                            ></img>
                        );
                    } else {
                        return (
                            <img
                                key={index.toString()}
                                onClick={() => {
                                    actions.setCurrentMember(mappedMember);
                                    setSelectedMember(store.currentMember);
                                    // actions.getHome();
                                    // actions.getTask();
                                }}
                                className="memberWidget--profile unselected"
                                src={mappedMember.photo_user}
                            ></img>
                        );
                    }
                })
            );
        }
    }, [store.member, store.currentMember, store.currentHome]);

    return (
        <Fragment>
            <div className="memberWidget__container">{widget}</div>
        </Fragment>
    );
};

export default MemberWidget;
