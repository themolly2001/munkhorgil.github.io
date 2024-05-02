import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Image;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.io.File;
import javax.sound.sampled.AudioSystem;
import javax.sound.sampled.Clip;
import javax.swing.JPanel;

public class GamePanel extends JPanel implements KeyListener {

    private Image ball, hoop;
    private int ballX, ballY, velX = 5, velY = 10, lives = 5, makes, i;
    private boolean MOVING = true, ENDOFGAME, RESTART;
    
    // Constructor to initialize the GamePanel with ball and hoop images
    public GamePanel(Image ball, Image hoop) {
        this.ball = ball;
        this.hoop = hoop;
        ballX = 0;
        ballY = 400;
        setBackground(Color.LIGHT_GRAY);
    }

    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);
        // Draw basketball lives
        for (int i = 0; i < lives; i++) {
            g.drawImage(ball, 465 - (i * 25), 45, 25, 25, null);
        }
        // Draw end game messages if the game has ended
        if (ENDOFGAME) {
            g.setFont(new Font("Impact", Font.BOLD, 40));
            g.drawString("Makes: " + makes, 173, 250);
            g.setFont(new Font("Impact", Font.ITALIC, 21));
            g.drawString("press spacebar to restart", 130, 275);
        }
        // Draw the score counter, hoop, and basketball
        g.setFont(new Font("Impact", Font.PLAIN, 25));
        g.drawString("" + makes, 10, 27);
        g.drawImage(hoop, 190, 0, 125, 125, null);
        g.drawImage(ball, ballX, ballY, 50, 50, null);
    }

    // Method to check if the basketball is in the hoop
    public boolean checkBall() {
        return ballX >= 200 && ballX <= 255 && ballY < 80;
    }

    // Method to play a sound (buzzer or swish) based on the given parameter
    public void playSound(int x) {
        // Determine the sound file based on the parameter
        String soundFile = (x == 1) ? "buzzer.wav" : "swish.wav";

        try {
            // Play the selected sound file
            Clip clip = AudioSystem.getClip();
            clip.open(AudioSystem.getAudioInputStream(new File(soundFile).getAbsoluteFile()));
            clip.start();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
    //main game functions
    public void run() {
        for (i = 0; i <= (450 / velX) * 2; i++) {
            if (!MOVING) {
                // Loop for the falling animation when the ball is shot
                for (int x = 0; x <= 415 / velY; x++) {
                    if (x == 415 / velY) {
                        // If the ball is missed, reduce lives and stop the ball
                        ballY = 415;
                        lives--;
                        MOVING = !MOVING;
                        break;
                    }
                    ballY -= velY;
                    repaint();
                    try {
                        Thread.sleep(20);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                    // Check for a made basket
                    if (checkBall()) {
                        MOVING = !MOVING;
                        playSound(-1);
                        makes++;
                        try {
                            Thread.sleep(50);
                        } catch (InterruptedException e) {
                            e.printStackTrace();
                        }
                        // Increase velocity and reset ball position for the next shot
                        velX++;
                        velY++;
                        i = 0;
                        ballX = 0;
                        ballY = 400;
                        break;
                    }
                }
            }
            // Reset the animation if the ball reaches the rim
            if (i == (450 / velX * 2))
                i = 0;

            // Move the ball horizontally based on the current animation step
            ballX = (i < 450 / velX) ? ballX + velX : ballX - velX;
            repaint();
            try {
                Thread.sleep(20);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            // Check for game over and play a buzzer sound
            if (lives == 0 && !ENDOFGAME) {
                playSound(1);
                ballX = -10000; // Move the ball off-screen to simulate disappearance
                ENDOFGAME = true; // Prevent the buzzer from playing forever
            }
        }
    }
    // Handle key events (pressing and releasing keys)
    @Override
    public void keyPressed(KeyEvent e) {
        // Restart the game if it has ended
        if (ENDOFGAME) {
            ballX = 0;
            ballY = 400;
            lives = 5;
            i = 0;
            velX = 5;
            velY = 10;
            makes = 0;
            ENDOFGAME = false;
            repaint();
            try {
                Thread.sleep(50);
            } catch (InterruptedException ex) {
                ex.printStackTrace();
            }
            return;
        }
        // Toggle the moving state of the ball when the spacebar is pressed
        if (e.getKeyCode() == KeyEvent.VK_SPACE) {
            MOVING = !MOVING;
        }
    }

    @Override
    public void keyReleased(KeyEvent e) {}

    @Override
    public void keyTyped(KeyEvent e) {}
}
