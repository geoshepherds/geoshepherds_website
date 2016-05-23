<div id="comments" class="col-xs-12 comments-area">
    
    <?php if ( have_comments() ) : ?>
    
        <h4>Join the discussion</h4>
    

            <ul class="comment-list">
                <?php
                    wp_list_comments( array(
                        'style'      => 'ul',
                        'short_ping' => true,
                    ) );
                ?>
            </ul>
    
    
    <?php endif; ?>
    
    
    
   <?php $fields =  array(

  'author' =>
    '<p class="comment-form-author"><label for="author">' . __( 'Name', 'domainreference' ) . '</label> ' .
    ( $req ? '<span class="required">*</span>' : '' ) .
    '<input id="author" name="author" type="text" value="' . esc_attr( $commenter['comment_author'] ) .
    '" size="30"' . $aria_req . ' /></p>',

  'email' =>
    '<p class="comment-form-email"><label for="email">' . __( 'Email', 'domainreference' ) . '</label> ' .
    ( $req ? '<span class="required">*</span>' : '' ) .
    '<input id="email" name="email" type="text" value="' . esc_attr(  $commenter['comment_author_email'] ) .
    '" size="30"' . $aria_req . ' /></p>'
                    ); ?>
    
    
    
    
    <?php $comment_args = array(
                    'fields' => apply_filters( 'comment_form_default_fields', $fields ),
                    'comment_notes_before' => '',
                    'title_reply' => 'Share your thoughts',
                    'title_reply_to' => 'Leave a reply to %s'
                    ); ?>

    
    <?php comment_form( $comment_args ); ?>
    
</div>