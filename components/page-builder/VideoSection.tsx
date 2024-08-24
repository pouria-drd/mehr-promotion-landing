interface VideoSectionProps {
    src: string;
    sectionId?: string;
}
const VideoSection = (props: VideoSectionProps) => {
    return (
        <iframe
            id={props.sectionId}
            className="aspect-video mx-auto w-full"
            src={props.src}
            allowFullScreen
        />
    );
};

export default VideoSection;
