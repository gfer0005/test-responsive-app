declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'geui-action-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        text?: string;
        type?: 'primary' | 'secondary' | 'tertiary' | 'primary-inverted' | 'secondary-inverted' | 
               'outline' | 'outline-header' | 'outline-on-dark' | 'link' | 'link-highlight' | 'link-on-dark';
        size?: 'x-small' | 'small' | 'normal' | 'large' | 'x-large';
        name?: string;
        flavor?: string;
        transactional?: boolean;
        disabled?: boolean;
        
      };
      'geui-title-text': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        size?: 'xx-large' |'x-large' | 'large' | 'x-medium'| 'medium' | 'small' | 'x-small' | 'xx-small';
        adaptive?: boolean;
      };
      'geui-text-label': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'geui-divider': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'geui-helptip': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        title?: string;
        size?: 'x-small' | 'small' | 'normal' | 'large' | 'x-large';
      };
      'geui-list-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        text?: string;
      };
      'geui-action-sheet': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        open?: boolean;
        backable?: boolean;
      };
      'geui-switch-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        labelPosition?: 'top' | 'right' | 'bottom' | 'left';
        labelAlignment?: 'start' | 'center' | 'end';
      };
      'geui-vertical-layout': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      
    }
  }
}

export {};

