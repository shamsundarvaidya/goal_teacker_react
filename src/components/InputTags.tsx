import {useState} from 'react';
import * as React from 'react'
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";

interface TagsInputProps {
    value: string[];
    onChange: (tags: string[]) => void;
    placeholder?: string;
}



export const TagsInput: React.FC<TagsInputProps> = ({value, placeholder = "Add a tag", onChange}) => {
    const [inputValue, setInputValue] = useState("");

    const handleAddTag = () => {
        if (inputValue.trim() && !value.includes(inputValue.trim())) {
            onChange([...value, inputValue.trim()]);
            setInputValue("");
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        const updatedTags = value.filter(tag => tag !== tagToRemove);
        onChange(updatedTags);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' || event.key === ',') {
            event.preventDefault();
            handleAddTag();
        }
    };

    return (
        <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
                {value.map((tag, index) => (
                    <Badge key={index} className="flex items-center space-x-1">
                        {tag}
                        <button onClick={() => handleRemoveTag(tag)} className="ml-1 text-red-500 hover:text-red-700">
                            &times;
                        </button>
                    </Badge>
                ))}
            </div>
            <div className="flex gap-2">
                <Input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className="flex-1"
                />
                <Button onClick={handleAddTag} variant="default">
                    Add
                </Button>
            </div>
        </div>
    );
};
