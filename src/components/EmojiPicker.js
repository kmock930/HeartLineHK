import { useEffect, useRef, useState } from "react";
import * as emojidata from "../data/emoji-extracted.json";

const EmojiPicker = (props) =>{

    const [selectedGroup, setSelectedGroup] = useState("Smileys and Emotion");
    const [emojiList, setEmojiList] = useState([]);

    const selectEmojiGroup = (e) =>{
        setSelectedGroup(e.target.id);
    }

    const selectEmoji = (e) =>{
        let targetInput = document.getElementById(props.targetId);
        let originalText = targetInput.value;
        if (targetInput){
            console.log(originalText);
            targetInput.value = originalText + e.target.innerHTML;
        }else console.error("ERROR: target input field is null!");
    }

    useEffect(() =>{
        document.querySelectorAll('.group-selected').forEach(el => el.classList.remove('group-selected'));
        document.getElementById(selectedGroup).classList.add('group-selected');
        for (var key in emojidata.default){
            if (key == selectedGroup) setEmojiList(emojidata.default[key]);
        }
    }, [selectedGroup]);

    return(
        <div className="emoji-picker-container">
            <div className="group-container">
                <a id="Smileys and Emotion" href="#!" onClick={selectEmojiGroup} dangerouslySetInnerHTML={{__html:emojidata["Smileys and Emotion"][0]}}></a>
                <a id="People and Body" href="#!" onClick={selectEmojiGroup} dangerouslySetInnerHTML={{__html:emojidata["People and Body"][0]}}></a>
                <a id="Animals and Nature" href="#!" onClick={selectEmojiGroup} dangerouslySetInnerHTML={{__html:emojidata["Animals and Nature"][0]}}></a>
                <a id="Food and Drink" href="#!" onClick={selectEmojiGroup} dangerouslySetInnerHTML={{__html:emojidata["Food and Drink"][0]}}></a>
                <a id="Travel and Places" href="#!" onClick={selectEmojiGroup} dangerouslySetInnerHTML={{__html:emojidata["Travel and Places"][0]}}></a>
                <a id="Activities" href="#!" onClick={selectEmojiGroup} dangerouslySetInnerHTML={{__html:emojidata["Activities"][0]}}></a>
                <a id="Objects" href="#!" onClick={selectEmojiGroup} dangerouslySetInnerHTML={{__html:emojidata["Objects"][0]}}></a>
                <a id="Symbols" href="#!" onClick={selectEmojiGroup} dangerouslySetInnerHTML={{__html:emojidata["Symbols"][0]}}></a>
                <a id="Flags" href="#!" onClick={selectEmojiGroup} dangerouslySetInnerHTML={{__html:emojidata["Flags"][0]}}></a>
            </div>
            <div className="emoji-container">
                <p>{selectedGroup}</p>
                <div className="group-emojis">
                    {emojiList.map((code, key) =>{
                        return(
                            <a key={key} href="#!" onClick={selectEmoji} dangerouslySetInnerHTML={{__html:code}}></a>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default EmojiPicker;