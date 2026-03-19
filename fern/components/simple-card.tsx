import { ReactElement } from "react";
import ArrowRightIcon from "../icons/arrow-right";
import { type Author, AuthorsContainer } from "./authors-container";

export interface SimpleCardProps {
  title: string;
  description: string;
  imageSrc: string;
  tags: string[];
  href: string;
  authors?: Author[];
}

export function SimpleCard({
  title,
  description,
  imageSrc,
  tags,
  href,
  authors,
}: SimpleCardProps): ReactElement {
  return (
    <div className="simple-card-container">
      <a
        href={href}
        target="_blank"
        style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'stretch' }}
      >
        <img className="image-desktop" style={{ width: '100%' }} src={imageSrc} />
        <img className="image-mobile" style={{ width: '100%' }} src={imageSrc} />
        <div className="simple-card-text-and-link-container">
          <div className="simple-card-text-container">
            <div className="small-tag-container">
              {tags.map((tag, idx) => (
                <span key={idx} className="small-tag-light">
                  {tag}
                </span>
              ))}
            </div>
            <p className="h4-title simple-card-title">{title}</p>
            <p className="p-title">{description}</p>
            {authors != null && authors.length > 0 && (
              <AuthorsContainer authors={authors} />
            )}
          </div>
          <div className="simple-card-link-container">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ display: 'inline-block', cursor: 'pointer', fontWeight: 500, color: '#39594D' }}>
                Build this
                <span style={{ marginLeft: 8, display: 'inline-block' }}>
                  <ArrowRightIcon />
                </span>
              </span>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
